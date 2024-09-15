/* tslint:disable */
/* eslint-disable */
/**
*
* * Hash the provided transform key into a buffer of bytes. The various transform key object fields are concatenated
* * in a specific order in order for transform keys to be signed over.
* 
* @param {any} transform_key_obj
* @returns {Uint8Array}
*/
export function transformKeyToBytes256(transform_key_obj: any): Uint8Array;
/**
*
* * Augment the provided transform key with the provided private key. Returns an augmented TransformKey object.
* 
* @param {any} transform_key_obj
* @param {Uint8Array} private_key
* @returns {any}
*/
export function augmentTransformKey256(transform_key_obj: any, private_key: Uint8Array): any;
/**
*
* * Augment the provided public key with the other provided public key. Returns a new augmented PublicKey object.
* 
* @param {any} current_public_key_obj
* @param {any} other_public_key_obj
* @returns {any}
*/
export function augmentPublicKey256(current_public_key_obj: any, other_public_key_obj: any): any;
/**
*
* * Add the two provided private keys together and return the bytes of a new PrivateKey.
* 
* @param {Uint8Array} private_key_a
* @param {Uint8Array} private_key_b
* @returns {Uint8Array}
*/
export function addPrivateKeys(private_key_a: Uint8Array, private_key_b: Uint8Array): Uint8Array;
/**
*
* * Subtract the first provided private key from the second provided private key. Returns the bytes of a new PrivateKey.
* 
* @param {Uint8Array} private_key_a
* @param {Uint8Array} private_key_b
* @returns {Uint8Array}
*/
export function subtractPrivateKeys(private_key_a: Uint8Array, private_key_b: Uint8Array): Uint8Array;
/**
*/
export class Api256 {
  free(): void;
/**
*/
  constructor();
/**
*
*     * Generate a new Recrypt key pair with both a public and private key and return both
*     * as Uint8Arrays.
*     
* @returns {any}
*/
  generateKeyPair(): any;
/**
*
*     * Generate and return an ed25519 signing public and private key.
*     
* @returns {any}
*/
  generateEd25519KeyPair(): any;
/**
*
*     * Sign the provided variable length message with the provided signing private key. Returns a 64 byte signature.
*     
* @param {Uint8Array} signing_private_key
* @param {Uint8Array} message
* @returns {Uint8Array}
*/
  ed25519Sign(signing_private_key: Uint8Array, message: Uint8Array): Uint8Array;
/**
*
*     * Verify the provided signature given the signing public key and the message to verify. Returns a boolean of whether the message was verified.
*     
* @param {Uint8Array} signing_public_key
* @param {Uint8Array} message
* @param {Uint8Array} signature
* @returns {boolean}
*/
  ed25519Verify(signing_public_key: Uint8Array, message: Uint8Array, signature: Uint8Array): boolean;
/**
*
*     * Compute an ed25519 signing public key given the signing private key.
*     
* @param {Uint8Array} signing_private_key
* @returns {Uint8Array}
*/
  computeEd25519PublicKey(signing_private_key: Uint8Array): Uint8Array;
/**
*
*     * Generate a new Recrypt plaintext and return it as a Uint8Array.
*     
* @returns {Uint8Array}
*/
  generatePlaintext(): Uint8Array;
/**
*
*     * Generate a transform key from the provided private key to the provided public key and use the provided signing key pair. Returns
*     * a JsObject which contains all the necessary keys for the transform key as Uint8Arrays.
*     
* @param {Uint8Array} from_private_key
* @param {any} to_public_key
* @param {Uint8Array} private_signing_key
* @returns {any}
*/
  generateTransformKey(from_private_key: Uint8Array, to_public_key: any, private_signing_key: Uint8Array): any;
/**
*
*     * Compute the private key for the provided public key. Returns a public key object in x/y form.
*     
* @param {Uint8Array} private_key
* @returns {any}
*/
  computePublicKey(private_key: Uint8Array): any;
/**
*
*     * Hash the incoming bytes to _exactly_ 32 bytes. Useful for generating PrivateKeys, among other things.
*     
* @param {Uint8Array} hashable_bytes
* @returns {Uint8Array}
*/
  hash256(hashable_bytes: Uint8Array): Uint8Array;
/**
*
*     * Derives a symmetric key from the provided plaintext.
*     
* @param {Uint8Array} plaintext
* @returns {Uint8Array}
*/
  deriveSymmetricKey(plaintext: Uint8Array): Uint8Array;
/**
*
*     * Encrypt the provided plaintext to the provided public key. Use the provided signing key pair to sign the encrypted value. Returns
*     * a complex object which can be passed into the decrypt function to get the provided plaintext back.
*     
* @param {Uint8Array} plaintext
* @param {any} to_public_key
* @param {Uint8Array} private_signing_key
* @returns {any}
*/
  encrypt(plaintext: Uint8Array, to_public_key: any, private_signing_key: Uint8Array): any;
/**
*
*     * Transform the provided EncryptedValue JS object using the provided TransformKey JS object. Returns a transformed
*     * EncryptedValue. Use the provided signing key pair to sign the encrypted value.
*     
* @param {any} encrypted_value
* @param {any} transform_key
* @param {Uint8Array} private_signing_key
* @returns {any}
*/
  transform(encrypted_value: any, transform_key: any, private_signing_key: Uint8Array): any;
/**
*
*     * Decrypt the provided encrypted value object using the provided private key. Returns the encrypted plaintext bytes as a Uint8Array.
*     
* @param {any} encrypted_value
* @param {Uint8Array} private_key
* @returns {Uint8Array}
*/
  decrypt(encrypted_value: any, private_key: Uint8Array): Uint8Array;
/**
*
*     * Schnorr sign the provided message using the provided public and private key. Returns a 64-byte signature.
*     
* @param {Uint8Array} private_key
* @param {any} public_key_obj
* @param {Uint8Array} message
* @returns {Uint8Array}
*/
  schnorrSign(private_key: Uint8Array, public_key_obj: any, message: Uint8Array): Uint8Array;
/**
*
*     * Verify the provided signature is valid by providing the public key, augmented private key, and original signed message content. Returns
*     * a boolean that denotes if the signature was verified.
*     
* @param {any} public_key_obj
* @param {Uint8Array | undefined} augmented_private_key
* @param {Uint8Array} message
* @param {Uint8Array} signature
* @returns {boolean}
*/
  schnorrVerify(public_key_obj: any, augmented_private_key: Uint8Array | undefined, message: Uint8Array, signature: Uint8Array): boolean;
}
/**
*/
export class EncryptedSearch {
  free(): void;
/**
*/
  constructor();
/**
*
*     * Hashes all possible tri-grams for the given string. The values will be prefixed with the partition_id and salt before being hashed.
*     
* @param {string} s
* @param {Uint8Array} salt
* @param {string | undefined} [partition_id]
* @returns {Uint32Array}
*/
  generateHashesForString(s: string, salt: Uint8Array, partition_id?: string): Uint32Array;
/**
*
*     * Hashes all possible tri-grams for the given string. The values will be prefixed with the partition_id and salt before
*     * being hashed. This function will also add some random entries to the result to not expose how many tri-grams were actually found.
*     
* @param {string} s
* @param {Uint8Array} salt
* @param {string | undefined} [partition_id]
* @returns {Uint32Array}
*/
  generateHashesForStringWithPadding(s: string, salt: Uint8Array, partition_id?: string): Uint32Array;
/**
* Generate a version of the input string where each character has been latinized using the
* same function as our tokenization routines.
* @param {string} s
* @returns {string}
*/
  static transliterateString(s: string): string;
}
