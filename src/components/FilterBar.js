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
                <header>I'm the Filter Bar</header>
                <hr></hr>
                {/* Category of Task  */}
                <select name='category' onChange={(event) => this.props.filterTaskCategory(event.target.value, event.target.name)}>
                    <option selected value="">Choose Category</option>
                    {this.props.options.map(option => {
                        return <option key={option} value={option}>{option}</option>
                    })}
                </select>
                <button onClick={this.handleClick}>{this.state.buttonLabel}</button>
            </div>
    )}
}
export default FilterBar;