//function decapitalize(s) {
//  return s[0].toLowerCase() + s.slice(1);
//}

function callExpression(expression) {
  let { arguments: args, callee } = expression;
  if(callee.type === 'MemberExpression') {
    return `j.callExpression(
          ${_memberExpression(callee)},
          [${buildArgs(args)}]
        )`;
  } else {
    return `j.callExpression(
          j.identifier('${callee.name}'),
          [${buildArgs(args)}]
        )`;
  }
}

function literal(node) {
  let value = typeof node.value === 'string' ? `'${node.value}'` : node.value;
  return `j.literal(${value})`;
}

function spreadElement(name) {
  return `j.spreadElement(j.identifier('${name}'))`;
}

function unaryExpression(node) {
  let { argument, operator, prefix } = node;
  return `j.unaryExpression(${operator}, ${literal(argument)}, ${prefix})`;
}

function arrayExpression(node) {
  let { elements } = node;
  let items = elements.map(e => {
    switch(e.type) {
      case 'Literal':
        return literal(e);
      case 'UnaryExpression':
        return unaryExpression(e);
    }
  }).join(',');

  return `j.arrayExpression([${items}])`;
}

function buildArgs(params) {
  let str = params.map(p => {
    switch(p.type) {
      case 'Literal':
        return  literal(p);
      case 'Identifier':
        return `j.identifier('${p.name}')`;
      case 'SpreadElement':
        return spreadElement(p.argument.name);

      case 'FunctionExpression':
        return functionExpression(p);
      default:  
        return '';
    }
  });

  return str.length > 0 && str[0] !== '' ? str.join(',') : '';
}
function buildValue(node) {
  switch(node.type) {
    case "Literal":
      return literal(node);
    case "ObjectExpression":
      return objectExpression(node);
    case "CallExpression":
      return callExpression(node);
    case "ArrayExpression":
      return arrayExpression(node);
    case "ArrowFunctionExpression":
      return arrowFunctionExpression(node);
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
          )])`;

            
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

      case 'FunctionDeclaration':
        return functionDeclaration(node);

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
  if(superClass) {
  str = `j.classDeclaration(
    j.identifier('${id.name}'),
    j.classBody([]),
    j.identifier('${superClass.name}')
  )`;
  } else {
str = `j.classDeclaration(
    j.identifier('${id.name}'),
    j.classBody([]),
    null
  )`;
  }
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

function functionDeclaration(node) {
  let str = '';
  let { id, body, params } = node;
  str = `j.functionDeclaration(
  j.identifier('${id.name}'),
  [${buildArgs(params)}],
  j.blockStatement([${buildBlock(body.body)}])
  )`;
  return str;
}

function functionExpression(node) {
  let str = '';
  let { id, body, params } = node;
  if(id) {
    str = `j.functionExpression(
  j.identifier('${id.name}'),
  [${buildArgs(params)}],
  j.blockStatement([${buildBlock(body.body)}])
  )`;
  } else {

    str = `j.functionExpression(
  null,
  [${buildArgs(params)}],
  j.blockStatement([${buildBlock(body.body)}])
  )`;
  }
  return str;
}

function arrowFunctionExpression(node) {
  let { params, body } = node;
  let str = '';

  switch(body.type) {
    case 'BlockStatement':
      str =  `j.arrowFunctionExpression(
      [${buildArgs(params)}],
      j.blockStatement([${buildBlock(body.body)}])
      )`;
      break;
    case 'Literal':
      str =  `j.arrowFunctionExpression(
      [${buildArgs(params)}],
      ${literal(body)}
      )`;
      break;

    case 'CallExpression':
      str =  `j.arrowFunctionExpression(
      [${buildArgs(params)}],
      ${callExpression(body)}
      )`;
      break;

  }

  return str;
}

export default {
  arrowFunctionExpression,
  classDeclaration,
  exportDefaultDeclaration,
  expressionStatement,
  functionDeclaration,
  ifStatement,
  importDeclaration,
  variableDeclaration,
}
