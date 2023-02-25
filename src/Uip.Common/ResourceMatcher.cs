namespace Uip.Common;

public static class ResourceMatcher
{
    const string KV_PREFIX = "kv:";

    // Returns:
    //   true if the loop should be broken
    //   false if the loop should continue
    public delegate bool KeyValueHandler(ReadOnlySpan<char> key, ReadOnlySpan<char> value);

    public static void ParseKvMatchString(
        ReadOnlySpan<char> matchString,
        KeyValueHandler handlePair
    )
    {
        if (!matchString.StartsWith(KV_PREFIX))
            throw new ResourceMatcherException("Match string does not start with 'kv:' prefix");

        for (int i = KV_PREFIX.Length; i < matchString.Length; i++)
        {
            if (matchString[i] == ' ')
                continue;

            var keyStartIndex = i;
            while (i < matchString.Length && matchString[i] != '=')
                i++;
            var keySpan = matchString[keyStartIndex..i++];

            var valueStartIndex = i;
            while (i < matchString.Length && matchString[i] != ';')
                i++;
            var valueSpan = matchString[valueStartIndex..i++];

            if (handlePair(keySpan, valueSpan))
                return;
        }
    }

    public static bool DoesValueMatchMatcher(
        ReadOnlySpan<char> value,
        ReadOnlySpan<char> matcherString
    )
    {
        // For now we only support exact matches
        return value.SequenceEqual(matcherString);
    }
}

[System.Serializable]
public class ResourceMatcherException : System.Exception
{
    public ResourceMatcherException() { }

    public ResourceMatcherException(string message)
        : base(message) { }

    public ResourceMatcherException(string message, System.Exception inner)
        : base(message, inner) { }

    protected ResourceMatcherException(
        System.Runtime.Serialization.SerializationInfo info,
        System.Runtime.Serialization.StreamingContext context
    )
        : base(info, context) { }
}
