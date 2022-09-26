type DefaultEntity = {
  id: number;
};

export const getEntityById = <T extends DefaultEntity>(
  id: number,
  entity: T[],
): [neededEntity: T, filterEntities: T[]] => {
  const [neededEntity, filterEntities] = entity.reduce(
    ([user, filterUsers], curr) => {
      if (curr?.id === id) {
        return [curr, filterUsers];
      } else {
        return [user, [...filterUsers, curr]];
      }
    },
    [null, []],
  );

  return [neededEntity, filterEntities];
};
