import { Snippet } from './Snippet';

// TODO: ENTITY FILTER SNIPPETS.
// TODO: WHY NOT GIVE THE FILTERED DATA IN THE FIRST PLACE WITH A USEMEMO?
export const FilterSnippets = ({ filterData, resetFilter, filter }) => {
  return (
    <div className="filter-snippets">
      {filterData
        .filter((item) => !!filter[item.type])
        .map((item) => {
          return (
            <Snippet handleChange={() => resetFilter(item.type)} remove={true}>
              {item.typeTitle} is {filter[item.type]}
            </Snippet>
          );
        })}
    </div>
  );
};
