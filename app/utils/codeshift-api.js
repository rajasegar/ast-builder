function decapitalize(s) {
  return s[0].toLowerCase() + s.slice(1);
}

function variableDeclaration(node) {
  let { kind, declarations } = node;
  let { id, init}  = declarations[0];
  let value = typeof init.value === "string" ? `'${init.value}'` : init.value;
  let str = `j.variableDeclaration(
  '${kind}',
      [j.variableDeclarator(
      j.identifier('${id.name}'),
        j.${decapitalize(init.type)}(${value})
          )]);`;

            
  return str;
}
function importDeclaration(node) {
  let { source, specifiers } = node;
  let { imported, local}  = specifiers[0];
  let str = `j.importDeclaration(
           [j.importSpecifier(j.identifier('${imported.name}'),j.identifier('${local.name}'))],
    j.literal('${source.value}')
                  );`;

  return str;
}

function buildArgs(params) {
  let str = params.map(p => {
    switch(p.type) {
      case 'Literal':
        return  `j.literal(${p.raw})`;
      case 'Identifier':
        return `j.identifier('${p.name}')`;
      default:  
        return '';
    }
  });

  return str.join(',');
}

function _memberExpression(node) {
  let str = '';
  let { object, property } = node;
  let obj = '';
  if(object.type === 'ThisExpression') {
    obj = `j.thisExpression()`;
  } else if(object.type === 'MemberExpression') {
    obj = `${_memberExpression(object)}`;
  } else {
    obj = `j.identifier('${object.name}')`;
  }
str = `j.memberExpression(
 ${obj},
 j.identifier('${property.name}')
  )`;
  return str;
}

function expressionStatement(node) {
  let { expression } = node;
  let { arguments: args, callee } = expression;
  let str = '';
  if (callee.type === 'MemberExpression') { // Member Expression
    str = `j.expressionStatement(
    j.callExpression(
    ${_memberExpression(callee)},
    [${buildArgs(args)}]
    ))`;
  } else { // Call Expression
    str = `j.expressionStatement(
    j.callExpression(
        j.identifier('${callee.name}'),
        [${buildArgs(args)}]
      ))`;
  }
  return str;
}

function ifStatement(node) {
  let { test, consequent, alternate } = node;
  let str = '';
  let condition;
  if(test.type === 'BinaryExpression') {
    let { operator, left, right } = test;
    condition = `j.binaryExpression('${operator}', j.identifier('${left.name}'), j.literal('${right.value}'))`;
  } else if(test.type === 'Identifier') {
    condition = `j.identifier(${test.name})`;
  }
  str = `j.ifStatement(
  ${condition},
  j.blockStatement([
    j.expressionStatement(j.callExpression(j.memberExpression(j.identifier('console'),j.identifier('log')),[j.literal('hello')]))
    ]))`;
  return str;
}

export default {
  variableDeclaration,
  importDeclaration,
  expressionStatement,
  ifStatement
}
