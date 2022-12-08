

import { HubtelSms } from "./dist";

const hubtelSms = new HubtelSms({
  clientId: "YOUR_HUBTEL_CLIENT_ID",
  clientSecret: "YOUR_HUBTEL_CLIENT_SECRET",
});


const sendSms = async () => {
    try {
  const data = await hubtelSms.quickSend({
    From: "ME",
    Content: "Hello There",
    To: "+23357XXXXXXX"
  });
  console.log(data);
} catch (err) {
  console.log(err);
}
}
