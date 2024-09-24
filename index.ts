// Level 1
/**
 * A breakdown:
 * T is a one of the primitive data that would be passed in
 * null | undefined | false | 0 | "" is a union type of non truthy values
 * ? false : true is a condition that determines if the type T is true or false
 *
 * So all-together is it basically checking if the passed types is within the consraints, then it is falsy else truthy
 */
type IsTruthy<T> = T extends null | undefined | false | 0 | '' ? false : true;

// Level 2
// keyof returns a union of all of the properties of they type(T) passed in
type User = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  interests?: Array<string>;
};

// Returns a type where the union of keys to exclude is removed ("password" | "email")
type KeysWithoutPassword = Omit<User, 'password' | 'email'>;

/**
 * Here is a breakdown of the Omit utility type works
 * type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
 */

type KeysToExclude = 'password' | 'email';

// Exclude utility type takes  a union type, and the value to remove from the union e.g ("password" | "email")
type KeysToInclude = Exclude<keyof User, KeysToExclude>;

// Returns a new type only picking the selected keys to include
type KeysToPick = Pick<User, KeysToInclude>;

// Level 3
// Typescript will infer the type of a and b when passed in else it will resolve to never, so we have a generic and a condition check
type ValidDoubleObject<T> = T extends { a: infer U; b: infer U } ? U : never;

// never
type IsNotValidDoubleObject = ValidDoubleObject<string>;

// never
type StillNotValidDoubleObject = ValidDoubleObject<{ c: string; b: number }>;

// string
type IsValidDoubleObject = ValidDoubleObject<{ a: string; b: string }>;

//string | number
type IsStillValidDoubleObject = ValidDoubleObject<{ a: string; b: number }>;

// Level 4
type ValidKeys<T> = {
  [K in keyof T]-?: Exclude<T[K], null> extends { a: infer U; b: infer U }
    ? IsTruthy<U> extends true
      ? K
      : never
    : never;
}[keyof T];

/**
 * Isolated example - Type mapping, so we map the keys of the passed type to a value.
 * e.g mapping the keys of User to true. So k is an iterator of each keys in the TypePassedIn (User).
 * -? is a mapped type modifier, it removes all optional ? or undefined keys, making it all required
 */

type ExampleMappedType<T> = { [K in keyof T]-?: true };

/** Will return a new types with all values mapped to true
 * type MappedValues = {
    email: true;
    password: true;
    first_name: true;
    last_name: true;
    interests: true;
}
 */
type MappedValues = ExampleMappedType<User>;
type ExampleABType = {
  valid: {
    a: string;
    b: string;
  } | null;
  valid1: {
    b: string;
    c: number;
  };
  i: null;
};

// never
type ExampleInValidKeys = ValidKeys<User>;

//  "valid" | "i"
type ExampleValidKeys = ValidKeys<ExampleABType>;
