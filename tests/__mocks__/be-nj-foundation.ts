/**
 * This is a manual mock of the 'be-nj-foundation' module.
 *
 * It is temporary here; it will be moved into its own project ('be-nj-foundation-mock')
 * and extended to also export custom Jest matchers for validation of the decorations
 *
 * DO NOT MOVE OR REMOVE THIS FILE!
 */

//
// Create a mock of the 'be-nj-foundation' module, modify it and export it
const foundation: FoundationMockType = jest.genMockFromModule('be-nj-foundation');

//
// The decorator factories must return functions (the actual decorators)
import * as decorators from 'be-nj-foundation/dist/decorators';
for (const name in decorators) {
  if (typeof decorators[name] === 'function') {
    (<jest.Mock<Decorator>>foundation[name]).mockReturnValue(() => undefined);
  }
}

//
// Export the Request and Response symbols as classes
const mockRequest: ExpressRequest = jest.genMockFromModule('express/lib/request');
foundation.Request = jest.fn(
  () => { return Object.create(mockRequest); }
).mockName('Request');

const mockResponse: ExpressResponse = jest.genMockFromModule('express/lib/response');
foundation.Response = jest.fn(
  () => { return Object.create(mockResponse); }
).mockName('Response');

//
// Export the updated mock
module.exports = exports = foundation;

//
// Declare some  types to make TypeScript happy
type ExpressRequest = {};
type ExpressResponse = {};
type FoundationMockType = {
  Request: ExpressRequest,
  Response: ExpressResponse,
};
type Decorator = ClassDecorator | PropertyDecorator | MethodDecorator | ParameterDecorator;
