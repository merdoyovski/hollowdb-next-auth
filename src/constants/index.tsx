export const message = "HollowDB";
export const testKey =
  "4735904570539279682275507070929548418220332715061423656258515080175565373207";
export const HOLLOWDB_TEST_TXID = "Dh2aTDs1BV-d-8KYNoK_hil0D25_nTe7-1M1Uvh2wTg";

const constants = {
  CIRCUITS: {
    HOLLOW_AUTHZ: {
      PROVER: "/circuits/hollow-authz-prover.zkey",
      WASM: "/circuits/hollow-authz.wasm",
    },
  },
};

export default constants as Readonly<typeof constants>;
