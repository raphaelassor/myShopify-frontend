import { Snippet } from "./Snippet"


export const FilterSnippets = ({filterData,resetFilter,filter }) => {
    return <div className="filter-snippets">
        {filterData.filter(item => !!filter[item.type])
            .map(item => {
                return <Snippet handleChange={() => resetFilter(item.type)} remove={true}>
                    {item.typeTitle} is {filter[item.type]}</Snippet>
            })}
    </div>
}