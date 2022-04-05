import { utils, BigNumber } from 'ethers';
import React from 'react';

interface Props {
  maxSupply: number,
  totalSupply: number,
  tokenPrice: BigNumber,
  maxMintAmountPerTx: number,
  isPaused: boolean,
  isWhitelistMintEnabled: boolean,
  isUserInWhitelist: boolean,
  mintTokens(mintAmount: number): Promise<void>,
  whitelistMintTokens(mintAmount: number): Promise<void>,
}

interface State {
  mintAmount: number;
}

const defaultState: State = {
  mintAmount: 1,
};

export default class MintWidget extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;
  }

  private canMint(): boolean {
    return !this.props.isPaused || this.canWhitelistMint();
  }

  private canWhitelistMint(): boolean {
    return this.props.isWhitelistMintEnabled && this.props.isUserInWhitelist;
  }

  private incrementMintAmount(): void {
    this.setState({
      mintAmount: Math.min(this.props.maxMintAmountPerTx, this.state.mintAmount + 1),
    });
  }

  private decrementMintAmount(): void {
    this.setState({
      mintAmount: Math.max(1, this.state.mintAmount - 1),
    });
  }

  private async mint(): Promise<void> {
    if (!this.props.isPaused) {
      await this.props.mintTokens(this.state.mintAmount);

      return;
    }

    await this.props.whitelistMintTokens(this.state.mintAmount);
  }

  render() {
    return (
      <>
        {this.canMint() ?
          <div className="mint-widget">
            <div className="preview">
              <img src="/build/images/preview.gif" alt="Crypto Elites NFT Collection - preview GIF" />
            </div>

            <div className="price">
              <strong>Total price:</strong> {utils.formatEther(this.props.tokenPrice.mul(this.state.mintAmount))} ETH
            </div>

            <div className="controls">
              <button className="decrease" onClick={() => this.decrementMintAmount()}>-</button>
              <span className="mint-amount">{this.state.mintAmount}</span>
              <button className="increase" onClick={() => this.incrementMintAmount()}>+</button>
              <button className="primary" onClick={() => this.mint()}>Mint</button>
            </div>
          </div>
          :
          <div className="cannot-mint">
            {/* <span className="emoji">⏳</span> */}
            
            {this.props.isWhitelistMintEnabled ? <>You are not included in the <strong>whitelist</strong>.</> : <>The sale is <strong>closed</strong> right now.</>}<br/>
            Please join our Crypto Elites discord server for more information. <br/>
          </div>
        }
      </>
    );
  }
}
