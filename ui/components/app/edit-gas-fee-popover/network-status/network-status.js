import React from 'react';

import { COLORS } from '../../../../helpers/constants/design-system';
import { useGasFeeContext } from '../../../../contexts/gasFee';
import I18nValue from '../../../ui/i18n-value';
import Typography from '../../../ui/typography/typography';

import { decETHToDecGWEI } from '../../../../helpers/utils/conversions.util';
import StatusSlider from './status-slider';

const NetworkStatus = () => {
  const { gasFeeEstimates } = useGasFeeContext();
  return (
    <div className="network-status">
      <Typography
        color={COLORS.UI4}
        fontSize="10px"
        fontWeight="bold"
        margin={[3, 0]}
        variant="h6"
      >
        <I18nValue messageKey="networkStatus" />
      </Typography>
      <div className="network-status__info">
        <div className="network-status__info__field">
          <span className="network-status__info__field-data">
            {gasFeeEstimates?.estimatedBaseFee &&
              `${decETHToDecGWEI(gasFeeEstimates?.estimatedBaseFee)} GWEI`}
          </span>
          <span className="network-status__info__field-label">Base fee</span>
        </div>
        <div className="network-status__info__separator" />
        <div className="network-status__info__field network-status__info__field--priority-fee">
          <span className="network-status__info__field-data">
            0.5 - 22 GWEI
          </span>
          <span className="network-status__info__field-label">
            Priority fee
          </span>
        </div>
        <div className="network-status__info__separator" />
        <div className="network-status__info__field">
          <StatusSlider />
        </div>
      </div>
    </div>
  );
};

NetworkStatus.propTypes = {};

export default NetworkStatus;
