function textNode(node) {
  return `b.text('${node.chars.replace('\n','')}')`;
}

function buildAttributes(attrs) {
  let _attrs = attrs.map(a => {
    switch(a.value.type) {
      case 'TextNode':
        return `b.attr('${a.name}', b.text('${a.value.chars}'))`; 

      default:
        console.log('buildAttributes => ', a.value.type); // eslint-disable-line
        return '';
    }
  });

  return _attrs.join(',');
}

function mustacheStatement(node) {
  return `b.mustache('${node.path.original}')`;
}
function buildChildren(children) {
  return children.map(child => {

      switch(child.type) {
        case 'TextNode':
          return textNode(child);

        case 'ElementNode':
          return elementNode(child);

        case 'MustacheStatement':
          return mustacheStatement(child);

        default:
          console.log('buildchildren => ', child.type); // eslint-disable-line
          return '';
      }

  }).join(',');
}
function elementNode(node) {
  let { selfClosing, tag, attributes, blockParams, children } = node;
  return `b.element({name: '${tag}', selfClosing: ${selfClosing}},
    {
    attrs: [${buildAttributes(attributes)}],
    children: [${buildChildren(children)}]
    }
  )`;
}

function buildAST(ast) {

// Build the Glimmer template api 
    let _ast = ast.body.map(node => {

      switch(node.type) {
        case 'TextNode':
          return textNode(node);

        case 'ElementNode':
          return elementNode(node);

        default:
          console.log('buildAST => ', node.type); // eslint-disable-line
          return '';
      }

    });

    return _ast;

}

export default {
  textNode,
  elementNode,
  buildAST
}
