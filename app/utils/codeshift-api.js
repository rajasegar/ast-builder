//function decapitalize(s) {
//  return s[0].toLowerCase() + s.slice(1);
//}

function callExpression(expression) {
  let { arguments: args, callee } = expression;
  return `j.callExpression(
        j.identifier('${callee.name}'),
        [${buildArgs(args)}]
      )`;
}

function literal(node) {
  let value = typeof node.value === 'string' ? `'${node.value}'` : node.value;
  return `j.literal(${value})`;
}

function buildValue(node) {
  switch(node.type) {
    case "Literal":
      return literal(node);
    case "ObjectExpression":
      return objectExpression(node);
    case "CallExpression":
      return callExpression(node);
    default:
      console.log(node.type); // eslint-disable-line
      return '';
  }
}

function objectExpression(node) {
  let { properties } = node;
  let str = properties.map(p => {
    let { key, value } = p;
    return `j.property("init", j.identifier('${key.name}'), ${buildValue(value)})`;
  });
  return `j.objectExpression([${str.join(',')}])`;
}
function variableDeclaration(node) {
  let { kind, declarations } = node;
  let { id, init}  = declarations[0];
  let value = buildValue(init);
  
  let str = `j.variableDeclaration(
  '${kind}',
      [j.variableDeclarator(
      j.identifier('${id.name}'),
        ${value}
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
  let { arguments: args, callee, extra } = expression;
  let str = '';
  if (callee.type === 'MemberExpression') { // Member Expression
    str = `j.expressionStatement(
    j.callExpression(
    ${_memberExpression(callee)},
    [${buildArgs(args)}]
    ))`;
  } else { // Call Expression

    if(extra && extra.parenthesized) {
      str = `j.expressionStatement(
     j.parenthesizedExpression(
    j.callExpression(
        j.identifier('${callee.name}'),
        [${buildArgs(args)}]
      )))`;

    } else {
      str = `j.expressionStatement(
    j.callExpression(
        j.identifier('${callee.name}'),
        [${buildArgs(args)}]
      ))`;
    }
  }
  return str;
}

function buildBlock(body) {
  // Build the jscodeshift api 
  let _ast = body.map(node => {

    switch(node.type) {
      case 'VariableDeclaration':
        return variableDeclaration(node);

      case 'ImportDeclaration':
        return importDeclaration(node);

      case 'ExpressionStatement':
        return expressionStatement(node);

      case 'IfStatement':
        return ifStatement(node);

      default:
        console.log(node.type); // eslint-disable-line
        return '';
    }

  });

  return _ast.join(',');
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

  if(alternate) {
    str = `j.ifStatement(
  ${condition},
  j.blockStatement([${buildBlock(consequent.body)}]),
  j.blockStatement([${buildBlock(alternate.body)}])
  )`;
  } else {
    str = `j.ifStatement(
  ${condition},
  j.blockStatement([${buildBlock(consequent.body)}])
  )`;
  }
  return str;
}

function classDeclaration(node) {

  let str = '';
  let { id, superClass, body } = node;
  str = `j.classDeclaration(
    j.identifier('${id.name}'),
    j.classBody([]),
    j.identifier('${superClass.name}')
  )`;
  return str;
}

function exportDefaultDeclaration(node) {
  let str = '';
  let { declaration } = node;
  let { id, superClass, body } = declaration;
  str = `j.exportDefaultDeclaration(
  j.classDeclaration(
    j.identifier('${id.name}'),
    j.classBody([]),
    j.identifier('${superClass.name}')
  )
  )`;
  return str;
}

export default {
  classDeclaration,
  exportDefaultDeclaration,
  expressionStatement,
  ifStatement,
  importDeclaration,
  variableDeclaration,
}
