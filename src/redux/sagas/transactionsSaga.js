import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import { 
  transactionRecentTx as TRANSACTION_RECENT_TX_API,
  transactionTxDetail as TRANSACTION_TX_DETAIL_API,
} from '../api/restV3';

function* watchTransactionRecentTx() { yield takeLatest (AT.transactionRecentTx, transactionRecentTxFunc) }
function* watchTransactionTxDetail() { yield takeLatest(AT.transactionTxDetail, transactionTxDetailFunc) }

export default function* transactionsSaga() {
  yield fork(watchTransactionRecentTx);
  yield fork(watchTransactionTxDetail);
}

function* transactionRecentTxFunc(action) {
  try {
    const payload = yield call(TRANSACTION_RECENT_TX_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.transactionRecentTxFulfilled, payload: payload});
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({type: AT.transactionRecentTxRejected});
  }
}

function* transactionTxDetailFunc(action){
  try {
    console.log('transactionTxDetailFunc')
    const payload = yield call(TRANSACTION_TX_DETAIL_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.transactionTxDetailFulfilled, payload: payload});
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({type: AT.transactionTxDetailRejected, error: action.payload.txHash});
  }
}