<template>
  <div class="login-container">
    <button type="button" @click="linkWallet()">链接钱包</button>
		<button type="button" @click="getBalance()">查询ETH余额</button>
		<button type="button" @click="transferAccounts()">转账</button>
		<button type="button" @click="getBalanceOf()">查询代币余额</button>
  </div>
</template>

<script>
  import { OpenSeaPort, Network } from 'opensea-js'
  export default {
    name: 'Login',
    data() {
      return {
        
      }
    },
    created(){
      
    },
    mounted(){
      let that = this
      window.addEventListener('load', function() {
        // 检查web3是否已经注入到(Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
          // 使用 Mist/MetaMask 的提供者
          that.web3js = new that.$Web3(web3.currentProvider);
          console.log('MetaMask')
        } else {
          console.log('请要安装 MetaMask 来使用应用')
          // 处理用户没安装的状况， 好比显示一个消息
          // 告诉他们要安装 MetaMask 来使用咱们的应用
        }
        // 如今你能够启动你的应用并自由访问 Web3.js:
        that.linkWallet()
      })
    },
    methods: {
      // 连接钱包
      linkWallet() {
        let that = this
        ethereum.enable().catch(function(reason) {
          //如果用户拒绝了登录请求
          if (reason === "User rejected provider access") {
            // 用户拒绝登录后执行语句；
          } else {
            // 本不该执行到这里，但是真到这里了，说明发生了意外
            Message.warning("There was a problem signing you in");
          }
        }).then(function(accounts) {
          that.fromAddress = accounts[0]
          console.log(accounts[0])
        });
      },
      // 查询余额
      getBalance(){
        this.web3js.eth.getBalance(this.fromAddress,(err, res) => {
          if (!err) {
            console.log("ETH余额==",res/Math.pow(10,18));
          }
        })
      },
      // 转账
      transferAccounts(){
        //转账数量
        let amount = 1*Math.pow(10,15);
        console.log(amount)
        //收款地址
        let toAddress = "0x3881799acAfC0E00e86ae7cb2A0104caFC78e2Eb";
        this.web3js.eth.sendTransaction({
          gas: 21000,
          gasPrice: 5000000000,
          from: this.fromAddress,
          to: toAddress,
          value: amount
        }, (err, result) => {
          console.log("转账Hash=",result)
        })
      },
      // 查询代币余额
      getBalanceOf(){
        let cryptozombiesABI = [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
        let myContract = new this.web3js.eth.Contract(cryptozombiesABI, '0xdAC17F958D2ee523a2206206994597C13D831ec7', {
            from: this.fromAddress, // default from address
            gasPrice: '0' // default gas price in wei, 20 gwei in this case
        });
        myContract.methods.balanceOf(this.fromAddress).call().then(function(r){
          console.log('show the custom account balance:',r);
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .login-container {
    
  }
</style>
