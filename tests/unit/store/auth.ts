import { test, expect } from 'vitest';
import { nextTick } from 'vue';
import { auth } from '@/store/auth';
import AxiosPlugin from '@/plugins/remote/axios';

test('token is set correctly', async () => {
  auth.authenticate({ token: 'test-token', user: {
    username: 'test',
    email: 'test',
    date_joined: 'test',
    is_client: false,
    image: {
      image: 'test',
      blurhash: 'test'
    }
  }
  });
  await nextTick();
  expect(AxiosPlugin.instance.defaults.headers.common['Authorization'])
    .toBe('Token test-token');
});
