import React, { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import { LoadingComponent } from "../../../../components";
import ButtonSet from "../../MiscComponents/ButtonSet";
import MiscComponents from "../../MiscComponents/MiscContractComponents";
import customStyles from "./ContractComponent.module.css";
import { customMethod } from "../../../../utils/rawTxMaker";
import { makeParams, createContractMethodsState } from "../../contractUtils";
import config from "../../../../config";

const { nid, network } = config;
const { ReadMethodItems, WriteMethodItems } = MiscComponents;

// const HARDCODED_NID_FIX_THIS = 2;

function ContractComponent({
  contract,
  contractReadWriteInfo,
  icxCall,
  icxSendTransaction,
  walletAddress
}) {
  const [params, setParams] = useState({});
  const [activeSection, setActiveSection] = useState(0);

  const handleChange = e => {
    const { name, value } = e.target;
    setParams({
      ...params,
      [name]: value
    });
  };

  function handleClickOnReadonly(address, method, inputs, index) {
    const paramsData = makeParams(params, method, inputs);
    icxCall({
      address,
      method,
      params: paramsData,
      index
    });
  }

  function handleClickOnWrite(address, method, inputs, index) {
    // makeTxCallRpcObj
    // const nid = HARDCODED_NID_FIX_THIS;

    if (walletAddress === "") {
      alert("Please connect to wallet first");
    } else {
      const paramsData = makeParams(params, method, inputs);
      const rawMethodCall = customMethod(
        walletAddress,
        address,
        method,
        paramsData,
        nid
      );
      console.log("rawMethodCall");
      console.log(rawMethodCall);
      icxSendTransaction({
        params: { ...rawMethodCall },
        index: index
      });
    }
  }

  function handleButtonExpand() {
    console.log('handleButtonExpand');
    console.log(data.address);
  }

  const { data } = contract;
  const { address } = data;
  const { loading, error } = contractReadWriteInfo;
  const contractMethodsState = createContractMethodsState(
    contractReadWriteInfo
  );

  console.log('contract address');
  console.log(address);

  //TODO: remove this useEffect after testing and refactoring
  useEffect(() => {
    console.log("contractReadWriteInfo and contractWriteInfo");
    console.log(contractReadWriteInfo);
    console.log("contract method state");
    console.log(contractMethodsState);
  }, [contractReadWriteInfo]);

  return (
    <div className="contents">
      <ButtonSet
        activeButton={activeSection}
        handleActiveChange={setActiveSection}
        showExpand={true}
        contract={address}
      />
      <div className={customStyles.contractContainer}>
        {activeSection === 0 ? (
          <div className={customStyles.titleContainer}>
            <span className={customStyles.titleItem}>
              Read/Write Contract methods
            </span>
            {loading ? (
              <LoadingComponent height="322px" />
            ) : !!error ? (
              <div className="scroll">
                <ul className="list">
                  <li>{error}</li>
                </ul>
              </div>
            ) : (
              <div className="scroll">
                <ReadMethodItems
                  methods={contractMethodsState}
                  params={params}
                  handleChange={handleChange}
                  handleClick={handleClickOnReadonly}
                  address={address}
                />
                <WriteMethodItems
                  methods={contractMethodsState}
                  params={params}
                  handleChange={handleChange}
                  handleClick={handleClickOnWrite}
                  address={address}
                  startIndex={contractMethodsState.readOnlyMethodsNameArray.length}
                />
              </div>
            )}
          </div>
        ) : activeSection === 1 ? (
          <div className={customStyles.titleContainer}>
            <span className={customStyles.titleItem}>
              Read contract methods
            </span>
            {loading ? (
              <LoadingComponent height="322px" />
            ) : (
              <div className="scroll">
                {!!error ? (
                  <ul className="list">
                    <li>{error}</li>
                  </ul>
                ) : (
                  <ReadMethodItems
                    methods={contractMethodsState}
                    params={params}
                    handleChange={handleChange}
                    handleClick={handleClickOnReadonly}
                    address={address}
                  />
                )}
              </div>
            )}
          </div>
        ) : activeSection === 2 ? (
          <div className={customStyles.titleContainer}>
            <span className={customStyles.titleItem}>
              Write contract methods
            </span>
            {loading ? (
              <LoadingComponent height="322px" />
            ) : (
              <div className="scroll">
                {!!error ? (
                  <ul className="list">
                    <li>{error}</li>
                  </ul>
                ) : (
                  <WriteMethodItems
                    methods={contractMethodsState}
                    params={params}
                    handleChange={handleChange}
                    handleClick={handleClickOnWrite}
                    address={address}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <div className={customStyles.titleContainer}>
            <span className={customStyles.titleItem}>
              Read/Write Contract methods
            </span>
            {loading ? (
              <LoadingComponent height="322px" />
            ) : !!error ? (
              <div className="scroll">
                <ul className="list">
                  <li>{error}</li>
                </ul>
              </div>
            ) : (
              <div className="scroll">
                <ReadMethodItems
                  methods={contractMethodsState}
                  params={params}
                  handleChange={handleChange}
                  handleClick={handleClickOnReadonly}
                  address={address}
                />
                <WriteMethodItems
                  methods={contractMethodsState}
                  params={params}
                  handleChange={handleChange}
                  handleClick={handleClickOnWrite}
                  address={address}
                  startIndex={contractMethodsState.readOnlyMethodsNameArray.length}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContractComponent;
