
import { PADI_CERTS, PADI_COLORS } from '@enums';

const padiColorMapper = ({ certification }) => {
  switch (certification) {
    case PADI_CERTS.OPEN_WATER:
      return PADI_COLORS.OPEN_WATER

    case PADI_CERTS.ADVANCED:
      return PADI_COLORS.ADVANCED

    case PADI_CERTS.RESCUE:
      return PADI_COLORS.RESCUE

    case PADI_CERTS.DIVEMASTER:
      return PADI_COLORS.DIVEMASTER

    default:
      return PADI_COLORS.DIVEMASTER
  }
};

export default padiColorMapper;
