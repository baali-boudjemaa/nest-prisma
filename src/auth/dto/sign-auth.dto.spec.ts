import { validate } from 'class-validator';
import { signInDto } from './sign-auth.dto';

describe('signInDto validation', () => {
    it('fails when email missing', async () => {
        const dto = new signInDto();
        dto.password = 'p';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('fails when email is invalid', async () => {
        const dto = new signInDto();
        dto.email = 'not-an-email' as any;
        dto.password = 'p';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('passes when valid', async () => {
        const dto = new signInDto();
        dto.email = 'a@b.com';
        dto.password = 'p';
        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });
});
