import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

const PK = 'your_channel_address_secret_key'; 
const Pkey = `0x${PK}`;
const _signer = new ethers.Wallet(Pkey);

const sendNotification = async() => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer: _signer,
      type: 1, 
      identityType: 2,
      notification: {
        title: `Crop sold`,
        body: `The crop has been sold`
      },
      payload: {
        title: `Crop sold`,
        body: `Your crop needs to be delivered to`,
        cta: '',
        img: ''
      },
      channel: 'eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681',
      env: 'staging'
    });
  } catch (err) {
    console.error('Error: ', err);
  }
}

sendNotification();