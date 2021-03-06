using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using ReservationSystem.Helpers;
using ReservationSystem.Interfaces;
using System.Threading.Tasks;

namespace ReservationSystem.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;
        public PhotoService(IOptions<CloudinarySettings> config)
        {
            var acc = new Account
            (
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var UploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(1000).Width(1000).Crop("fill")
                };
                UploadResult = await _cloudinary.UploadAsync(uploadParams);
            }
            return UploadResult;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);

            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result;
        }


        public async Task<DelResResult> DeleteExistingPhotosAsync(string[] photoIds)
        {
            var result = await _cloudinary.DeleteResourcesAsync(ResourceType.Image, photoIds);
            return result;
        }
    }
}
