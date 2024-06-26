﻿namespace API.Errors;

public class ApiErrorResponse
{
    public ApiErrorResponse(int statusCode, string message = null)
    {
        StatusCode = statusCode;
        Message = message ?? GetDefaultMessageForStatusCode(statusCode);
    }

    public int StatusCode { get; set; }
    public string Message { get; set; }

    private static string GetDefaultMessageForStatusCode(int statusCode)
    {
        return statusCode switch
        {
            400 => "A bad request, you have made",
            401 => "Autherized, you are not",
            403 => "Forbidden",
            404 => "Resource found, it was not",
            500
                => "Errors are the path to the dark side. Errors lead to anger. Anger leads to hate. Hate leads to career change",
            _ => null
        };
    }
}
