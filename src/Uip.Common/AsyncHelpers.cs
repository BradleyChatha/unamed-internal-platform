namespace Uip.Common;

public static class AsyncHelpers
{
    public static async IAsyncEnumerable<T> AsAsyncEnumerable<T>(this IEnumerable<T> enumerable)
    {
        foreach (var value in enumerable)
            yield return value;

        await Task.CompletedTask;
    }

    public static async IAsyncEnumerable<T2> SelectMany<T, T2>(
        this IAsyncEnumerable<T> enumerable,
        Func<T, IAsyncEnumerable<T2>> selector
    )
    {
        await foreach (var value in enumerable)
            await foreach (var value2 in selector(value))
                yield return value2;
    }

    public static async IAsyncEnumerable<T2> SelectMany<T, T2>(
        this IAsyncEnumerable<T> enumerable,
        Func<T, IEnumerable<T2>> selector
    )
    {
        await foreach (var value in enumerable)
            foreach (var value2 in selector(value))
                yield return value2;
    }

    public static async IAsyncEnumerable<T2> Select<T, T2>(
        this IAsyncEnumerable<T> enumerable,
        Func<T, T2> selector
    )
    {
        await foreach (var value in enumerable)
            yield return selector(value);
    }

    public static async ValueTask<bool> AnyAsync<T>(
        this IAsyncEnumerable<T> enumerable,
        Func<T, bool> predicate
    )
    {
        await foreach (var value in enumerable)
            if (predicate(value))
                return true;

        return false;
    }

    public static async ValueTask<IList<T>> ToListAsync<T>(this IAsyncEnumerable<T> enumerable)
    {
        var list = new List<T>();
        await foreach (var value in enumerable)
            list.Add(value);

        return list;
    }
}
