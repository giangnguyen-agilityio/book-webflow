// Constants
import { AVATAR_CONFIG, AVATAR_BASE_URL } from '@/constants';

// Utils
import { generateRandomAvatar, selectRandomElement } from '@/utils';

describe('Avatar Utils', () => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.5;
  global.Math = mockMath;

  describe('generateRandomAvatar', () => {
    it('should generate a valid avatar URL', () => {
      const avatarUrl = generateRandomAvatar();

      // Check if URL starts with base URL
      expect(avatarUrl).toContain(AVATAR_BASE_URL);

      // Check if URL contains all required parameters
      Object.keys(AVATAR_CONFIG).forEach((key) => {
        expect(avatarUrl).toContain(key);
      });
    });

    it('should generate different URLs on multiple calls', () => {
      // Reset Math.random before each call
      jest
        .spyOn(global.Math, 'random')
        .mockReturnValueOnce(0.3)
        .mockReturnValueOnce(0.7);

      const url1 = generateRandomAvatar();
      const url2 = generateRandomAvatar();

      expect(url1).not.toBe(url2);
    });
  });

  describe('selectRandomElement', () => {
    it('should select middle element when Math.random returns 0.5', () => {
      const testArray = ['a', 'b', 'c'];
      const result = selectRandomElement(testArray);

      // With Math.random = 0.5, it should select middle elements from config arrays
      expect(result).toContain('b');
    });
  });

  describe('buildAvatarUrlParams', () => {
    it('should include all config parameters', () => {
      const url = generateRandomAvatar();

      // Check if URL contains all configuration parameters
      expect(url).toContain('avatarStyle=');
      expect(url).toContain('topType=');
      expect(url).toContain('accessoriesType=');
      expect(url).toContain('hairColor=');
      expect(url).toContain('facialHairType=');
      expect(url).toContain('clotheType=');
      expect(url).toContain('clotheColor=');
      expect(url).toContain('eyeType=');
      expect(url).toContain('eyebrowType=');
      expect(url).toContain('mouthType=');
      expect(url).toContain('skinColor=');
    });
  });
});
