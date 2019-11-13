function textNode(node) {
  console.log(node.chars);
  return `b.text('${node.chars.replace('\n','')}')`;
}

function elementNode(node) {
  let { selfClosing, tag } = node;
  return `b.element({name: '${tag}', selfClosing: ${selfClosing}},
    {})`;
}

export default {
  textNode,
  elementNode
}
