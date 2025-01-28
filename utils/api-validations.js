
// Validate request body for generateAvatarPhotos
export function validateGenerateAvatarPhotosBody(body) {
    const requiredFields = ['name', 'age', 'gender', 'ethnicity', 'orientation', 'pose', 'style', 'appearance'];
    const ageOptions = ['Young Adult', 'Early Middle Age', 'Late Middle Age', 'Senior', 'Unspecified'];
    const genderOptions = ['Women', 'Men', 'Unspecified'];
    const ethnicityOptions = ['White', 'Black', 'Asian American', 'East Asian', 'South East Asian', 'South Asian', 'Middle Eastern', 'Pacific', 'Hispanic', 'Unspecified'];
    const orientationOptions = ['square', 'horizontal', 'vertical'];
    const poseOptions = ['half_body', 'close_up', 'full_body'];
    const styleOptions = ['Realistic', 'Pixar', 'Cinematic', 'Vintage', 'Nior', 'Cyberpunk', 'Unspecified'];

    for (const field of requiredFields) {
        if (!body[field]) {
            throw new Error(`Missing required field: ${field}`);
        }
    }

    if (!ageOptions.includes(body.age)) {
        throw new Error(`Invalid age option: ${body.age}`);
    }

    if (!genderOptions.includes(body.gender)) {
        throw new Error(`Invalid gender option: ${body.gender}`);
    }

    if (!ethnicityOptions.includes(body.ethnicity)) {
        throw new Error(`Invalid ethnicity option: ${body.ethnicity}`);
    }

    if (!orientationOptions.includes(body.orientation)) {
        throw new Error(`Invalid orientation option: ${body.orientation}`);
    }

    if (!poseOptions.includes(body.pose)) {
        throw new Error(`Invalid pose option: ${body.pose}`);
    }

    if (!styleOptions.includes(body.style)) {
        throw new Error(`Invalid style option: ${body.style}`);
    }

    if (body.appearance.length > 1000) {
        throw new Error('Appearance description exceeds maximum length of 1000 characters');
    }
}