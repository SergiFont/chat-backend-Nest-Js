// import { join } from 'path';
// import { CommonService } from './common.service';

// describe('CommonService', () => {
//   let commonService: CommonService;

//   beforeEach(() => {
//     commonService = new CommonService();
//   });

//   describe('getStaticFile', () => {
//     it('should return the correct path when file exists', () => {
//       const file = 'test.txt';
//       const directory = 'assets';
//       const expectedPath = join(__dirname, directory, file);
//       expect(commonService.getStaticFile(file, directory)).toEqual(
//         expectedPath,
//       );
//     });

//     it('should throw an error when file does not exist', () => {
//       const file = 'nonexistent.txt';
//       const directory = 'assets';
//       expect(() => commonService.getStaticFile(file, directory)).toThrowError();
//     });
//   });

//   describe('handleDbExceptions', () => {
//     it('should throw an error with the correct message when error code is 23505', () => {
//       const error = {
//         code: '23505',
//         detail: 'Duplicate key value violates unique constraint',
//       };
//       expect(() => commonService.handleDbExceptions(error)).toThrowError(
//         'Duplicate key value violates unique constraint',
//       );
//     });

//     it('should throw an error with the correct message when error code is not 23505', () => {
//       const error = {
//         code: '42P01',
//         detail: 'relation "nonexistent_table" does not exist',
//       };
//       expect(() => commonService.handleDbExceptions(error)).toThrowError(
//         'Unexpected error, check server logs',
//       );
//     });
//   });
// });
