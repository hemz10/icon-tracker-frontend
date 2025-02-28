import { connect } from "react-redux";
import { ProposalListPage } from "../../components";
import { withRouter } from "react-router-dom";
import { setPopup } from "../../redux/store/popups";

function mapStateToProps(state) {
  return {
    url: state.router.location,
    walletAddress: state.storage.walletAddress
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPopup: payload => dispatch(setPopup(payload))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProposalListPage)
);
