export function errorCodeToMessage(errorCode) {
  switch (errorCode) {
    case "auth/invalid-email":
      return "The email address is not valid.";

    case "auth/user-disabled":
      return "This user account has been disabled.";

    case "auth/user-not-found":
      return "No user found with this email address.";

    case "auth/wrong-password":
      return "Incorrect password, please try again.";

    case "auth/email-already-in-use":
      return "This email is already associated with another account.";

    case "auth/weak-password":
      return "The password is too weak. Please use a stronger password.";

    case "auth/operation-not-allowed":
      return "This operation is not allowed. Please contact support.";

    case "auth/too-many-requests":
      return "We have detected too many requests from your device. Please take a break and try again later.";

    case "auth/network-request-failed":
      return "Network error occurred, please check your internet connection.";

    case "auth/requires-recent-login":
      return "This operation is sensitive and requires recent authentication. Log in again before retrying this request.";

    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.";

    case "auth/invalid-credential":
      return "The credential provided is malformed or has expired.";

    case "auth/wrong-number-of-segments":
      return "JWT provided had wrong number of segments. A Firebase ID token has three segments, separated by '.'";

    case "auth/invalid-verification-code":
      return "The credential verification code is incorrect.";

    case "auth/invalid-verification-id":
      return "The verification ID used to create the phone auth credential is invalid.";

    case "auth/custom-token-mismatch":
      return "The custom token corresponds to a different audience.";

    case "auth/invalid-custom-token":
      return "The custom token format is incorrect. Please check the documentation.";

    case "auth/credential-already-in-use":
      return "This credential is already associated with a different user account.";

    default:
      return "Unknown error occurred. Please try again.";
  }
}
