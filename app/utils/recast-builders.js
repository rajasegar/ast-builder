import { types } from 'recast';
const b = types.builders;

function _variableDeclaration(node) {
  let { kind, declarations } = node;
  let { id, init}  = declarations[0];

  return b.variableDeclaration(
    kind,
    [b.variableDeclarator(
      b.identifier(id.name),
      b.literal(init.value)
    )]);
}

function _importDeclaration(node) {
  let { source, specifiers } = node;
  let { imported, local}  = specifiers[0];
  return b.importDeclaration(
    [
      b.importSpecifier(b.identifier(imported.name),
      b.identifier(local.name))
    ],
    b.literal(source.value)
  );
}

export default {
  buildVariableDeclaration: _variableDeclaration,
  buildImportDeclaration: _importDeclaration
}
