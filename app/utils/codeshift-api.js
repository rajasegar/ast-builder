function callExpression(expression) {
  let { arguments: args, callee } = expression;
  if(callee.type === 'MemberExpression') {
    return `j.callExpression(
          ${memberExpression(callee)},
          [${buildArgs(args)}]
        )`;
  } else {
    return `j.callExpression(
          ${identifier(callee)},
          [${buildArgs(args)}]
        )`;
  }
}

function literal(node) {
  let value = typeof node.value === 'string' ? `'${node.value}'` : node.value;
  return `j.literal(${value})`;
}

function identifier(node) {
  return `j.identifier('${node.name}')`;
}

function spreadElement(name) {
  return `j.spreadElement(j.identifier('${name}'))`;
}

function unaryExpression(node) {
  let { argument, operator, prefix } = node;
  return `j.unaryExpression('${operator}', ${literal(argument)}, ${prefix})`;
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

      case 'CallExpression':
        return callExpression(p);

      case 'MemberExpression':
        return memberExpression(p);

      default:  
        console.log('buildArgs => ', p.type); // eslint-disable-line
        return '';
    }
  });

  return str.join(',');
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
    case "Identifier":
      return identifier(node);
    default:
      console.log('buildValue => ', node.type); // eslint-disable-line
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

function property(node) {
    let { key, value } = node;
    return `j.property("init", j.identifier('${key.name}'), ${buildValue(value)})`;
}

function buildProperties(props) {
  return props.map(p => {
    return property(p);
  }).join(',');
}

function buildElements(elements) {
  return elements.map(e => {
    return identifier(e);
  }).join(',');
}

function variableDeclarator(node) {
  let str = '';
  let { id, init}  = node;
  switch(id.type) {
    case 'Identifier':
      str = `j.variableDeclarator(
      j.identifier('${id.name}'),
        ${buildValue(init)}
          )`;
      break;
    case 'ObjectPattern':
      str = `j.variableDeclarator(
      j.objectPattern([${buildProperties(id.properties)}]),
        ${buildValue(init)}
          )`;
      break;
    case 'ArrayPattern':
      str = `j.variableDeclarator(
      j.arrayPattern([${buildElements(id.elements)}]),
        ${buildValue(init)}
          )`;
      break;
  }
  return str;
}
function variableDeclaration(node) {
  let { kind, declarations } = node;
  
  let str = `j.variableDeclaration(
  '${kind}',
      [${variableDeclarator(declarations[0])}])`;
           
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



function memberExpression(node) {
  let str = '';
  let { object, property } = node;
  let obj = '';
  switch(object.type) {
    case 'ThisExpression':
      obj = `j.thisExpression()`;
      break;

    case 'MemberExpression':
      obj = `${memberExpression(object)}`;
      break;

    case 'Identifier':
      obj = `j.identifier('${object.name}')`;
      break;

    case 'CallExpression':
      obj = callExpression(object);
      break;

    default:
      console.log('memberExpression => ', object.type);  // eslint-disable-line
      break;
  }

str = `j.memberExpression(
 ${obj},
 j.identifier('${property.name}')
  )`;
  return str;
}

function assignmentExpression(node) {
  let str = '';
  let { operator, left, right } = node;
  switch(left.type) {
    case 'Identifier':
      str = `j.assignmentExpression(
        '${operator}',
        ${identifier(left)},
        ${buildValue(right)}
      )`;
      break;
    case 'MemberExpression':
      str = `j.assignmentExpression(
        '${operator}',
        ${memberExpression(left)},
        ${buildValue(right)}
      )`;
      break;
  }
  return str;
}

function expressionStatement(node) {
  let { expression } = node;
  let { arguments: args, callee, extra } = expression;
  let str = '';
  switch(expression.type) {
    case 'MemberExpression':
      str = `j.expressionStatement(
      j.callExpression(
      ${memberExpression(callee)},
      [${buildArgs(args)}]
      ))`;
      break;
    case 'CallExpression':
      if(extra && extra.parenthesized) {
        str = `j.expressionStatement(
       j.parenthesizedExpression(
      j.callExpression(
          j.identifier('${callee.name}'),
          [${buildArgs(args)}]
        )))`;

      } else {
        str = `j.expressionStatement(
        ${callExpression(expression)}
        )`;
      }
      break;
    case 'AssignmentExpression':
      str = `j.expressionStatement(${assignmentExpression(expression)})`;      
      break;
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
        console.log('buildBlock => ', node.type); // eslint-disable-line
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

function buildClassBody(body) {
  return body.map(b => {
    switch(b.type) {
      case 'MethodDefinition':
        return `j.methodDefinition(
          '${b.kind}',
          ${identifier(b.key)},
          ${functionExpression(b.value)},
          ${b.static}
        )`;
    }

  }).join(',');
}
function classDeclaration(node) {

  let str = '';
  let { id, superClass, body } = node;
  let _super = superClass ? identifier(superClass) : null;
  str = `j.classDeclaration(
    ${identifier(id)},
    j.classBody([${buildClassBody(body.body)}]),
    ${_super}
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
    j.classBody([${buildClassBody(body.body)}]),
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
