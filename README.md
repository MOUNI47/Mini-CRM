
# Mini CRM - React Native (Expo)

This is a scaffolded Mini CRM mobile app built with React Native (Expo), Redux Toolkit, and a mock backend (JSON Server).

## Quick start

1. Install dependencies:
```bash
npm install
```

2. Start JSON Server (mock backend):
```bash
npm run json-server
```

3. Start Expo:
```bash
npm start
```

4. If using a physical device, update `src/api/api.js` baseURL to your machine IP (e.g. http://192.168.1.100:3000)

## Features
- Register / Login (mock)
- Redux Toolkit state (auth, customers, leads)
- Persisted auth token (redux-persist)
- Customer list with search
- Customer details with associated leads
- Create/Edit leads
- Dashboard with charts (react-native-chart-kit)
- Basic Jest test for auth reducer

