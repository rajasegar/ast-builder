export function createVariableDeclaration(node) {
  let { kind, declarations } = node;
  let { id, init}  = declarations[0];
  let str = `
          j.variableDeclaration(
          '${kind}',
              [j.variableDeclarator(
              j.identifier('${id.name}'),
                j.${init.type}(${init.value})
                  )]);`;

            
  return str;
}
export function createImportDeclaration(node) {
  let { source, specifiers } = node;
  let { imported, local}  = specifiers[0];
  let str = `
          j.importDeclaration(
           [j.importSpecifier(j.identifier('${imported.name}'),j.identifier('${local.name}'))],
    j.literal('${source.value}')
                  );`;

  return str;
}
export default function codeshiftApi() {
  return true;
}
