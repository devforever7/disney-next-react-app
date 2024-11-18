import '@testing-library/jest-dom';
import MockNextImage from '@/__mocks__/image';

jest.mock('next/image', () => MockNextImage);
