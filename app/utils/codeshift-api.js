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
  //let value = typeof node.value === 'string'  ? `'${node.value}'` : node.value;
  //return `j.literal(${value})`;
  return `j.literal(${node.value || '""'})`;
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
    case "MemberExpression":
      return memberExpression(node);
    case 'BinaryExpression':
      return binaryExpression(node);
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
  let { object, property, computed } = node;
  let obj = '';

  // Constructing object of a MemberExpression
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

  let prop = '';
  // Constructing property of a MemberExpression
  switch(property.type) {
    case 'Identifier':
      prop = identifier(property);
      break;

    case 'Literal':
      prop = literal(property);
      break;

    default:
      console.log('memberExpression.property => ', property.type); // eslint-disable-line
      break;
  }

str = `j.memberExpression(
 ${obj},
 ${prop},
 ${computed}
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

function buildCallee(node) {
  let str = '';
  switch(node.type) {
    case 'Identifier':
      str = identifier(node);
      break;

    default:
      console.log('buildCallee => ', node.type); // eslint-disable-line
      break;
  }

  return str;
}

function expressionStatement(node) {
  let { expression } = node;
  let { extra } = expression;
  let str = '';
  switch(expression.type) {
    case 'MemberExpression':
      str = `j.expressionStatement(${memberExpression(expression)})`;
      break;

    case 'CallExpression':
      if(extra && extra.parenthesized) {
        str = `j.expressionStatement(
       j.parenthesizedExpression(
       ${callExpression(expression)}
       ))`;
      } else {
        str = `j.expressionStatement(${callExpression(expression)})`;
      }
      break;

    case 'AssignmentExpression':
      str = `j.expressionStatement(${assignmentExpression(expression)})`;      
      break;

    case 'Identifier':
      str = `j.expressionStatement(${identifier(expression)})`;
      break;

    case 'BinaryExpression':
      str = binaryExpression(expression);
      break;

    default:
      console.log('expressionStatement => ', expression.type); // eslint-disable-line
      break;
  }
    
  return str;
}

function returnStatement(node) {
  let { argument: arg } = node;
  let str = '';
  switch(arg.type) {
    case 'CallExpression':
      str = `j.returnStatement(${callExpression(arg)})`;
      break;

    case 'Identifier':
      str = `j.returnStatement(${identifier(arg)})`;
      break;

    default:
      console.log('returnStatement => ', arg.type); // eslint-disable-line
      break;
  }

  return str;
}

function breakStatement() {
  return `j.breakStatement()`;
}

function newExpression(node) {
  let { callee, arguments: args } = node;
  return `j.newExpression(
  ${buildCallee(callee)},
  [${buildArgs(args)}]
  )`;
}
function throwStatement(node) {
  let { argument } = node;
  let arg = '';
  switch(argument.type) {
    case 'NewExpression':
      arg = newExpression(argument);
      break;

    case 'Identifier':
      arg = identifier(argument);
      break;

    default:
      console.log('thowStatement => ', argument.type); // eslint-disable-line
      break;
      
  }
  return `j.throwStatement(
  ${arg}
  )`;
}

function continueStatement() {
  return `j.continueStatement()`;
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

      case 'ReturnStatement':
        return returnStatement(node);

      case 'BreakStatement':
        return breakStatement();

      case 'ThrowStatement':
        return throwStatement(node);

      case 'ContinueStatement':
        return continueStatement();

      default:
        console.log('buildBlock => ', node.type); // eslint-disable-line
        return '';
    }

  });

  return _ast.join(',');
}

function binaryExpression(node) {
  let { operator, left, right } = node;

  let _left = '';
  let _right = '';

  switch(left.type) {
    case 'Identifier':
      _left = identifier(left);
      break;

    default:
      console.log('binaryExpression::left => ', left.type); // eslint-disable-line
      break;
  }

  switch(right.type) {
    case 'Literal':
      _right = literal(right);
      break;

    case 'BinaryExpression':
      _right = binaryExpression(right);
      break;

    case 'Identifier':
      _right = identifier(right);
      break;

    default:
      console.log('binaryExpression::right => ', right.type); // eslint-disable-line
      break;
    
  }

  return  `j.binaryExpression(
    '${operator}', 
    ${_left},
    ${_right}
  )`;
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
  switch(declaration.type) {
    case 'FunctionDeclaration':
      str = `j.exportDefaultDeclaration(${functionDeclaration(declaration)})` ;
      break;

    case 'ClassDeclaration':
      str = `j.exportDefaultDeclaration(${classDeclaration(declaration)})` ;
      break;

    default:
      console.log('exportDefaultDeclaration =>', declaration.type); // eslint-disable-line
  }


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

function buildSwitchCases(cases) {
  return cases.map(c => {
    let { test, consequent } = c;
    let str = '';
    if(test) {
    switch(test.type) {
      case 'Literal':
        str = `j.switchCase(${literal(test)}, [${buildBlock(consequent)}])`; 
        break;

      default:
        console.log('buildSwitchCases => ', test.type); // eslint-disable-line
        break;
    }
    } else {
        str =  `j.switchCase(null, [${buildBlock(consequent)}])`; 
    }
    return str;
  }).join(',');
}

function switchStatement(node) {
  let str = '';
  let { cases, discriminant } = node;
  let d = '';
  switch(discriminant.type) {
    case 'Identifier':
      d = identifier(discriminant);
      break;

    default:
      console.log('switchStatement::discriminant => ', discriminant.type); // eslint-disable-line
      break;
      
  }
  str = `j.switchStatement(${d},[${buildSwitchCases(cases)}])`;
  return str;
}

function catchClause(node) {
  let { param, guard, body } = node;
  return `j.catchClause(
  ${identifier(param)},
  null,
  ${blockStatement(body.body)}
  )`;
}

function blockStatement(node) {
  return `j.blockStatement([${buildBlock(node)}])`;
}
function tryStatement(node) {
  let str = '';
  let { block, handler, finalizer } = node;
  str = `j.tryStatement(
    ${blockStatement(block.body)},
    ${catchClause(handler)},
    ${blockStatement(finalizer.body)}
  )`;
  return str;
}

function updateExpression(node) {
  let { operator, argument, prefix } = node;
  return `j.updateExpression(
  '${operator}', 
  ${identifier(argument)},
  ${prefix}
  )`;
}

function forStatement(node) {
  let { init, test, update, body } = node;
  let str = '';
  let _init = '';
  let _test = '';
  let _update = '';

  // Building for init
  switch(init.type) {
    case 'VariableDeclaration':
      _init = variableDeclaration(init);
      break;

    default:
      console.log('forStatement::init =>', init.type); // eslint-disable-line
      break;
  }

  // Building for test
  switch(test.type) {
    case 'BinaryExpression':
      _test = binaryExpression(test);
      break;

    default:
      console.log('forStatement::test => ', test.type); // eslint-disable-line
      break;
  }

  // Building for update
  switch(update.type) {
    case 'UpdateExpression':
      _update = updateExpression(update);
      break;

    default:
      console.log('forStatement::test => ', update.type); // eslint-disable-line
      break;
  }

  str = `j.forStatement(
    ${_init},
    ${_test},
    ${_update},
    ${blockStatement(body.body)}
  )`;
  return str;
}
function buildAST(ast) {

    // Build the jscodeshift api 
    let _ast = ast.program.body.map(node => {

      switch(node.type) {
        case 'VariableDeclaration':
          return variableDeclaration(node);

        case 'ImportDeclaration':
          return importDeclaration(node);

        case 'ExpressionStatement':
          return expressionStatement(node);

        case 'IfStatement':
          return ifStatement(node);

        case 'ExportDefaultDeclaration':
          return exportDefaultDeclaration(node);

        case 'ClassDeclaration':
          return classDeclaration(node);

        case 'FunctionDeclaration':
          return functionDeclaration(node);

        case 'ArrowFunctionExpression':
          return arrowFunctionExpression(node);

        case 'ReturnStatement':
          return returnStatement(node);

        case 'SwitchStatement':
          return switchStatement(node);

        case 'TryStatement':
          return tryStatement(node);

        case 'ForStatement':
          return forStatement(node);

        default:
          console.log('buildAST => ', node.type); // eslint-disable-line
          return '';
      }

    });

    return _ast;
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
  buildAST
}
