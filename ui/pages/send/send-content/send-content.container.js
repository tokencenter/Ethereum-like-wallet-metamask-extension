import { connect } from 'react-redux';
import {
  accountsWithSendEtherInfoSelector,
  getAddressBookEntry,
  getIsEthGasPriceFetched,
  getNoGasPriceFetched,
  checkNetworkOrAccountNotSupports1559,
} from '../../../selectors';
import {
  getIsBalanceInsufficient,
  getSendTo,
  getSendAsset,
  getAssetError,
} from '../../../ducks/send';
import { getPreferences, getIsBuyableChain, transactionFeeSelector, getUseNonceField } from '../../../selectors';
import { showModal } from '../../../store/actions';

import SendContent from './send-content.component';

function mapStateToProps(state) {
  const ownedAccounts = accountsWithSendEtherInfoSelector(state);
  const to = getSendTo(state);
  const isBuyableChain = getIsBuyableChain(state);

  const {
    currentCurrency,
    nativeCurrency,
    provider,
  } = state.metamask;
  const {
    draftTransaction
  } = state.send;

  const chainId = provider.chainId;

const {
  hexTransactionAmount,
  hexMinimumTransactionFee,
  hexMaximumTransactionFee,
  hexTransactionTotal,
} = transactionFeeSelector(state, draftTransaction);

const { useNativeCurrencyAsPrimaryCurrency } = getPreferences(state);

  return {
    isOwnedAccount: Boolean(
      ownedAccounts.find(
        ({ address }) => address.toLowerCase() === to.toLowerCase(),
      ),
    ),
    contact: getAddressBookEntry(state, to),
    isEthGasPrice: getIsEthGasPriceFetched(state),
    noGasPrice: getNoGasPriceFetched(state),
    to,
    networkOrAccountNotSupports1559: checkNetworkOrAccountNotSupports1559(
      state,
    ),
    getIsBalanceInsufficient: getIsBalanceInsufficient(state),
    asset: getSendAsset(state),
    assetError: getAssetError(state),
    useNonceField: getUseNonceField(state),
    draftTransaction: draftTransaction,
    hexMaximumTransactionFee: hexMaximumTransactionFee, 
    hexMinimumTransactionFee: hexMinimumTransactionFee,
    hexTransactionTotal: hexTransactionTotal,
    hexTransactionAmount: hexTransactionAmount,
    currentCurrency,
    nativeCurrency,
    useNativeCurrencyAsPrimaryCurrency,
    isBuyableChain,
    chainId,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    showBuyModal: () => dispatch(showModal({ name: 'DEPOSIT_ETHER' })),
    showAccountDetails: () => dispatch(showModal({ name: 'ACCOUNT_DETAILS' })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendContent);
