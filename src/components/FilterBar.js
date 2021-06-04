import { Component } from "react";

class FilterBar extends Component {

    state = {
        buttonLabel: "Only Show Open Tasks"
    }

    handleClick = () => {
        this.props.filterHasVolunteer();
        this.setState({buttonLabel: this.state.buttonLabel !== "Only Show Open Tasks" ? "Only Show Open Tasks" : "Show All Tasks" })
    }

    render()
    {
        return(
            <div>
                <h4>Filter Tasks</h4>
                {/* Category of Task  */}
                <select name='category' onChange={(event) => this.props.filterTaskCategory(event.target.value, event.target.name)}>
                    <option selected value="">Choose Category</option>
                    {this.props.options.map(option => {
                        return <option key={option} value={option}>{option}</option>
                    })}
                </select>
                <button className="btn btn-info btn-sm" onClick={this.handleClick}>{this.state.buttonLabel}</button>
                <hr></hr>
            </div>
    )}
}
export default FilterBar;