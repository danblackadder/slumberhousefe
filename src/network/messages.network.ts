import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import { IMessage } from 'models/messages.types';

export const useGroupMessages = ({ groupId }: { groupId: string | undefined }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (groupId) {
      const source = new EventSource(`${process.env.API_URL}/messages/${groupId}`, { withCredentials: true });

      source.onmessage = (e) => {
        console.log(JSON.parse(e.data));
        setMessages(JSON.parse(e.data).reverse());
        setLoading(false);
      };

      source.onerror = (err: unknown) => {
        console.log(err);
        setError('An error occured');
        source.close();
        setLoading(false);
      };

      return () => {
        source.close();
      };
    }

    return undefined;
  }, [groupId]);

  return { messages, error, loading };
};

export const postGroupMessage = ({ groupId, message }: { groupId: string | undefined; message: string }) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios
      .post(`/messages/${groupId}`, { message })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
