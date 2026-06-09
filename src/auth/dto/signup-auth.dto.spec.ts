import { validate } from 'class-validator';
import { signupDto } from './signup-auth.dto';

describe('signupDto validation', () => {
    it('fails when required fields missing', async () => {
        const dto = new signupDto();
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('passes when valid', async () => {
        const dto = new signupDto();
        dto.email = 'a@b.com';
        dto.password = 'pass';
        dto.name = 'Name';
        // role is an enum from prisma; provide a string to satisfy validation in tests
        (dto as any).role = 'USER';
        const errors = await validate(dto as any);
        expect(errors.length).toBe(0);
    });
});
