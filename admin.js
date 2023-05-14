const admin = require('firebase-admin');

// firebase service account pk
const type = "service_account";
const project_id = "courso-7f857";
const private_key_id = "53df06287fe42276174f5e7f8221d1a8b4ecfa23";
const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCZYegkvaUDsQKn\nHLSbAweTFmIksCyrqp7uvXMzkbFi5EDDZTBZA9im8OGnxbAU1TFoCvqMQEkX5ll5\nApS+cNqCeU8f1yUWUxUdSZDkBsFA1qi3EdQuV1Q6lXspsYD3V2VDwPxvnoJf4M1n\nrYJT6IHxNaXAEftRROps6Kv2VQY77WE9X5bzeESVNM0LaXQiWR1Jqs5CXknyZeSA\ngRlqf1tZ384VL8tK4yFYMr+MgoN8FVVwsljq618GFxk0g15c7KvWhhHtE8us88PV\nn/0kIGivbI77I5FJVi6yiLt2BnS3NmBRX1CIZuWbbc6r0kKhXUeZjfocAbA4DrVf\nVkwpPSIhAgMBAAECggEAQUGM3RjMPGpSWRvW4P5kehkzTy2fC7gvHx5+BUougIbg\n4ODLtYtz4O6p6tGqDOr5Nq05FHODRYZMubW15+ImrQ0Ec2T60+ksGgZC/Si8jqPl\nKuIMdlzUKoqPWFk7J8BIho90Nt7m0/jWGw6QXLeWlTOAXduoo1ZhME27X7WjzdmT\nZcCXVavYW6IAfeVegFpDh3dfoA6gC0pgYOzsmAvCfu0K8BfIvG/LVJG4+rMBFkrR\ne0NfCwfmZYf8w5kLw3sXmwuWtx6F2JNKHSG/6OIhebj2fmNEm9Tin5uwhSlApXFa\nEgLPoUCihLD1Hr7RmwF/V6Hcm6yYVKFazlUyZapr0wKBgQDNVmnyWjYJuc8XM7gl\n21puZfIAp2tYDfO1Rf9xoiIn1vssoHVmdmvBrTYxUisvEGGc/Pt1Kjo0xhJgskbR\n5/2bsKWEzzlUk4ZrJw+CeD+WFQWO0N1zUBJ1IppLjdsRo7QrGfjyIyPEYCCD0eTV\nRNtrFurtQK4ThBTKTPKtdnnaowKBgQC/OeP4+30cIIsqJhDx0sUUigVIgzVOmPwl\no/FWbTsg8w1zzzju7NaIH1LKksIOYLZ48GPKbBKEFNW5HSo7qjgmlNdzOSNl3EFB\ncvlNfRNix6A2ZEsTN378jLg5dnEVrg8VFTNHEdVH/hJMk1UTxWBJU6+fNllYidF2\nB8evjCJAawKBgCiss3P0drvaeLFJ53JoTzOLMjL69wKMUPhZk045JbbqmPqwFlFj\np9jHrPJ8Kl26SvvECTOeV8VYbw+EgQ7Xe585kLAMNHkSeBAFvsbDdyUNqPovWY6c\nD+vwHMxWn0yRNwFKtcuRNmaR/B7glwnACA7gjUzOAS2QfmXMdE30KBMtAoGAQ0nG\nm3U7J+uXrKQqcD1/VePfSg3JczfH+iK/KG9VUBnWkPrJCOHT96A2DMwpds+3RcUp\nCDCRL2L5daL6mnYiPgk/6u6fMxeW6sXfTdIGQUsHaDxQYpmzmICXzriLwFo4Om30\nVjzDNQsFO2bYmBVq9UJ6WObR96K/Tu4b6PzBjLMCgYBdOHX9bkHu4inZocDk9nU/\nWxyq+67yEyEmadpSrsMnm80ZiEhy43NR/BSLaVWZ8Ypdq02X2Ts6fuFq5ll1myuu\n/nrlfiMHkToJALeJ9D2kVCSRPKlxz8EJbgo+47yfVloXXoaR41f3sLSbspNf3icc\nrMCB0pMk1dGXqQwdbh4sHg==\n-----END PRIVATE KEY-----\n";
const client_email = "firebase-adminsdk-he1mn@courso-7f857.iam.gserviceaccount.com";
const client_id = "106021097919318665897";
const auth_uri = "https://accounts.google.com/o/oauth2/auth";
const token_uri = "https://oauth2.googleapis.com/token";
const auth_provider_x509_cert_url = "https://www.googleapis.com/oauth2/v1/certs";
const client_x509_cert_url = "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-he1mn%40courso-7f857.iam.gserviceaccount.com";


// credential grants access to Firebase services
admin.initializeApp({
  credential: admin.credential.cert({
      type,
      project_id,
      private_key_id,
      private_key:
        private_key.replace(/\\n/g,'\n'),
      client_email,
      client_id,
      auth_uri,
      token_uri,
      auth_provider_x509_cert_url,
      client_x509_cert_url
  }),
});

module.exports = admin;