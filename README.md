# Emetify
Emetify (Emet + verify 😉) is a type-safe schema validator inspired by zod [Zod](https://github.com/colinhacks/zod).\
The library has only the core features of Zod, becasue it written for learning purposes.

## Installation

To install, simply run the following command:

```bash
npm install @emetify
```

## Usage

Here's a quick example of the usage:

```typescript
const { e } from '@emetify';

const schema = e.object({
    name: e.string().min(3).max(20),
    age: e.number(),
});

// ✅ Valid - returns the parsed object
schema.parse({ name: 'Alice', age: 30 });

// ❌ Invalid - throws an error
schema.parse({ name: 'Bob', age: '30' });
```

## TODO List:
- [ ] Implement refinements
- [ ] Add tests for implementation & types
- [ ] Add `e.email()`, `e.url()`, `e.uuid()`, `e.date()`, `e.boolean()`, `e.null()`, `e.undefined()`
