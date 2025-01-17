import axios from "axios";
import qs from "querystring";
import { Config } from "./interfaces/Config";
import { QuickSendMessage } from "./interfaces/QuickSendMessage";
import { SendMessage } from "./interfaces/SendMessage";
import { ScheduleMessage } from "./interfaces/ScheduleMessage";
import { SendMessageResponse } from "./interfaces/SendMessageResponse";
import { getCommonHeaders } from "./utils/helper";
import { Message } from "./interfaces/Message";
import { QueryMessageResponse } from "./interfaces/QueryMessageResponse";
import { CancelScheduledMessageResponse } from "./interfaces/CancelScheduledMessageResponse";

const BASE_URL = "https://smsc.hubtel.com/v1/messages";

export class HubtelSms {
  private headers!: object;
  constructor(private readonly config: Partial<Config>) {
    if (!(config.clientId && config.clientSecret)) {
      throw new Error("Invalid Configuration");
    }

    this.headers = {
      ...getCommonHeaders(
        this.config.clientId as string,
        this.config.clientSecret as string
      )
    };
  }

  /**
   * @async
   * @param {QuickSendMessage} QuickSendMessage
   * @returns {Promise<SendMessageResponse>} Promise<SendMessageResponse>
   */

  async quickSend(data: QuickSendMessage): Promise<SendMessageResponse> {
    try {
      const response = await axios.get(
        `${BASE_URL}/send?${qs.stringify({...data})}&ClientId=${
          this.config.clientId
        }&ClientSecret=${this.config.clientSecret}`
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  /**
   * @async
   * @param {SendMessage} SendMessage
   * @returns {Promise<SendMessageResponse>} Promise<SendMessageResponse>
   */
  async sendMessage(data: SendMessage): Promise<SendMessageResponse> {
    try {
      const response = await axios.post(`${BASE_URL}`, data, {
        headers: this.headers
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  /**
   * @async
   * @param {string} MessageId
   * @returns {Promise<Message>} Promise<Message>
   */

  async getMessage(MessageId: string): Promise<Message> {
    try {
      const response = await axios.get(`${BASE_URL}/${MessageId}`, {
        headers: this.headers
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  /**
   * @async
   * @returns {Promise<QueryMessageResponse>} Promise<QueryMessageResponse>
   */
  async queryMessage(): Promise<QueryMessageResponse>{
    try {
      const response = await axios.get(`${BASE_URL}`, {
        headers: this.headers
      });

      return response.data;
    } catch (err) {
      throw err;
    }
  };

  /**
   * @async
   * @param {ScheduleMessage} ScheduleMessage
   * @returns {Promise<SendMessageResponse>} Promise<SendMessageResponse>
   */
  async scheduleMessage(
    data: ScheduleMessage
  ): Promise<SendMessageResponse>{
    try {
      const response = await axios.post(`${BASE_URL}`, data, {
        headers: this.headers
      });

      return response.data;
    } catch (err) {
      throw err;
    }
  };

  /**
   * @async
   * @param {string} MessageId
   * @param {string} Time
   * @returns {Promise<SendMessageResponse>} Promise<SendMessageResponse>
   */
  async rescheduleScheduledMessage(data: {
    MessageId: string,
    Time: string
  }): Promise<SendMessageResponse>{
    try {
      const response = await axios.put(
        `${BASE_URL}/${data.MessageId}`,
        { Time: data.Time },
        {
          headers: this.headers
        }
      );

      return response.data;
    } catch (err) {
      throw err;
    }
  };

  /**
   * @async
   * @param {string} MessageId
   * @returns {Promise<CancelScheduledMessageResponse>} Promise<CancelScheduledMessageResponse>
   */
  async cancelScheduledMessage (
    MessageId: string
  ): Promise<CancelScheduledMessageResponse> {
    try {
      const response = await axios.delete(`${BASE_URL}/${MessageId}`, {
        headers: this.headers
      });

      return response.data;
    } catch (err) {
      throw err;
    }
  };
}
