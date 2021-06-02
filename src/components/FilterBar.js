const FilterBar = (props) => {
    return(
    <div>
        <header>I'm the Filter Bar</header>
        <hr></hr>
        {/* Category of Task  */}
        <select name='category' onChange={(event) => props.filterTasks(event.target.value, event.target.name)}>
            <option selected value="">Choose Category</option>
            {props.options.map(option => {
                return <option key={option} value={option}>{option}</option>
            })}
        </select>
        <select name='hasVolunteer' onChange={(event) => props.filterTasks(event.target.value, event.target.name)}>
            <option selected disabled>Already has volunteer</option>
            <option key={1} value={true}>True</option>
            <option key={0} value={false}>False</option>
        </select>
    </div>
    )
}
export default FilterBar;