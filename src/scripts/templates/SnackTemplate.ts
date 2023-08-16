class SnackTemplate {
    constructor() {}

    getSuccessForm = (message?: string): string => `
        <div class="alert alert--success text text-black text-normal">
            <i class="fas fa-check-circle"></i> 
            ${message || ''} 
        </div>
    `

    getFailedForm = (message?: string): string => `
        <div class="alert alert--failed text text-black text-normal">
            <i class="fas fa-times-circle"></i> 
            ${message || ''} 
        </div>
    `
}

export default SnackTemplate
