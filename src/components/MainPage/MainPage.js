import React, { Component } from 'react'
import { InfoSummary, RecentBlocks, RecentTransactions } from 'components'
import { search } from 'redux/actions/searchActions';
import { connect } from 'react-redux'

class MainPage extends Component {

    state = {
        value: ''
    }

    input = null

    handleChange = e => {
        const { value } = e.target
        this.setState({ value })
    }

    handleKeyDown = e => {
        if (e.key === 'Enter') {
            this.props.search(this.state.value)
        }
        if (e.key === 'Escape') {
            this.setState({ value: '' }, () => {
                this.input.blur()
            })
        }
    }

    componentWillMount() {
        this.props.getMainInfo()
    }

    render() {
        return (
            <div className="content-wrap">
                <div className="screen2">
                    <div className="wrap-holder">
                        <div className="content">
                            <p>ICON Blockchain Explorer</p>
                            <div className="search-group txt fixing">
                                <input ref={ref => { this.input = ref }} type="text" className="txt-type-search" placeholder="Name, Address, TxHash, Block, SCORE" value={this.state.value} onKeyDown={this.handleKeyDown} onChange={this.handleChange} /><span><i className="img"></i></span><em><i className="img"></i></em>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="screen0">
                    <div className="wrap-holder">
                        <ul className="content">
                            <InfoSummary {...this.props} />
                        </ul>
                    </div>
                </div>
                <div className="screen1">
                    <div className="bg">
                        <div className="wrap-holder">
                            <ul className="content">
                                <RecentBlocks {...this.props} />
                                <RecentTransactions {...this.props} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        search: param => dispatch(search(param)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
