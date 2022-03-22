import { Icon } from '@douyinfe/semi-ui';

export const IconAddRowAfter: React.FC<{ style?: React.CSSProperties }> = ({ style = {} }) => {
  return (
    <Icon
      style={style}
      svg={
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path
            d="M938.666667 426.666667a85.333333 85.333333 0 0 1-85.333334 85.333333H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333333V128h85.333334v85.333333h170.666666V128h85.333334v85.333333h170.666666V128h85.333334v85.333333h170.666666V128h85.333334v298.666667M170.666667 426.666667h170.666666V298.666667H170.666667v128m256 0h170.666666V298.666667h-170.666666v128m426.666666 0V298.666667h-170.666666v128h170.666666m-384 170.666666h85.333334v128h128v85.333334h-128v128h-85.333334v-128H341.333333v-85.333334h128v-128z"
            fill=""
          ></path>
        </svg>
      }
    />
  );
};
