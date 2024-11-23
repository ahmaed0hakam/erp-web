/**
 * Interface representing the properties of a Snackbar notification.
 */
export interface ISnackBar {
    /**
     * The message to be displayed in the Snackbar.
     */
    message: string,

    /**
     * The type of the Snackbar which affects its styling.
     * Options are 'success', 'error', or 'info'.
     */
    type?: 'success' | 'error' | 'info', 

    /**
     * The horizontal position of the Snackbar on the screen.
     * Can be 'start' (left) or 'end' (right).
     */
    horizontalPosition?: 'start' | 'center' | 'end' | 'left' | 'right', 

    /**
     * The vertical position of the Snackbar.
     * Can be 'top' or 'bottom'.
     */
    verticalPosition?: 'top' | 'bottom', 

    /**
     * The duration in milliseconds for which the Snackbar is visible.
     */
    duration?: number 
}