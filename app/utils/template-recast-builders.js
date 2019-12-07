function textNode(node) {
  // To escape newline characters inside template literals
  let t = node.chars.replace(/\n/g, "\\n");
  return `b.text("${t}")`;
}

// Build element attributes
function buildAttributes(attrs) {
  let _attrs = attrs.map(a => {
    switch (a.value.type) {
      case "TextNode":
        return `b.attr('${a.name}', ${textNode(a.value)})`;

      case "MustacheStatement":
        return `b.attr('${a.name}', ${mustacheStatement(a.value)})`;

      default:
        console.log("buildAttributes => ", a.value.type); // eslint-disable-line
        return "";
    }
  });

  return _attrs.join(",");
}

// Extracted from ember-angle-brackets-codemod transform
function transformNestedSubExpression(subExpression) {
  let positionalArgs = subExpression.params.map(param => {
    if (param.type === "SubExpression") {
      return transformNestedSubExpression(param);
    } else if (param.type === "StringLiteral") {
      return `"${param.original}"`;
    } else {
      return param.original;
    }
  });

  let namedArgs = [];
  if (subExpression.hash.pairs.length > 0) {
    namedArgs = subExpression.hash.pairs.map(pair => {
      if (pair.value.type === "SubExpression") {
        let nestedValue = transformNestedSubExpression(pair.value);
        return `${pair.key}=${nestedValue}`;
      } else {
        if (pair.value.type === "StringLiteral") {
          return `${pair.key}="${pair.value.original}"`;
        }
        return `${pair.key}=${pair.value.original}`;
      }
    });
  }

  let args = positionalArgs.concat(namedArgs);
  return `(${subExpression.path.original} ${args.join(" ")})`;
}

// Build Params for Mustache Statements
// Extracted from ember-angle-brackets-codemod transform
function buildParams(params) {
  return params
    .map(p => {
      switch (p.type) {
        case "SubExpression":
          return transformNestedSubExpression(p);

        case "StringLiteral":
          return `"${p.original}"`;

        case "NullLiteral":
          return "null";

        case "UndefinedLiteral":
          return "undefined";

        default:
          console.log("buildParams => ", p.type); // eslint-disable-line
          return p.original;
      }
    })
    .join(" ");
}

// Build Params for Block Statements
function buildBlockParams(params) {
  return params
    .map(p => {
      return `b.path('${p.original}')`;
    })
    .join(",");
}

function mustacheStatement(node) {
  if (node.params.length > 0) {
    return `b.mustache(b.path('${node.path.original} ${buildParams(
      node.params
    )}'))`;
  } else {
    return `b.mustache('${node.path.original}')`;
  }
}
function buildChildren(children) {
  return children
    .map(child => {
      switch (child.type) {
        case "TextNode":
          return textNode(child);

        case "ElementNode":
          return elementNode(child);

        case "MustacheStatement":
          return mustacheStatement(child);

        default:
          console.log("buildchildren => ", child.type); // eslint-disable-line
          return "";
      }
    })
    .join(",");
}
function elementNode(node) {
  let { selfClosing, tag, attributes, children } = node;
  return `b.element({name: '${tag}', selfClosing: ${selfClosing}},
    {
    attrs: [${buildAttributes(attributes)}],
    children: [${buildChildren(children)}]
    }
  )`;
}

function blockStatement(node) {
  let { path, program, params } = node;
  return `b.program([
      b.block(
        b.path('${path.original}'),
        [${buildBlockParams(params)}],
        b.hash([b.path('lskdf'),'laskjdf']),
        b.blockItself([${buildChildren(program.body)}])
      ),
    ])`;
}
function buildAST(ast) {
  // Build the Glimmer template api
  let _body = ast && ast.body ? ast.body : [];
  let _ast = _body.map(node => {
    switch (node.type) {
      case "TextNode":
        return textNode(node);

      case "ElementNode":
        return elementNode(node);

      case "BlockStatement":
        return blockStatement(node);

      default:
        console.log("buildAST => ", node.type); // eslint-disable-line
    }
  });

  return _ast;
}

export default {
  textNode,
  elementNode,
  buildAST
};
