using Microsoft.Data.Sqlite;
using ProgettoEsameMVC.Helpers;
using SQLitePCL;

namespace RestTestApplication.Database
{
    public class SQLiteDatabase
    {
        string connectionString = "Data Source=.\\Database\\GestionaleAccessPoint.db";

        public SQLiteDatabase()
        {
            raw.SetProvider(new SQLite3Provider_e_sqlite3());
        }

        public async Task<List<Utente>> OttieniUtenteAsync(Utente lookup)
        {
            var listaUtenti = new List<Utente>();
            await using (var connection = new SqliteConnection(connectionString))
            {
                try
                {
                    await connection.OpenAsync();
                    var query = connection.CreateCommand();
                    
                    query.CommandText =
                        """
                            SELECT id, password FROM Utenti WHERE Utenti.id = @userId
                        """;

                    query.Parameters.AddWithValue("@userId", lookup.ID);

                    await using (var reader = await query.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            string id = reader.GetString(reader.GetOrdinal("id"));
                            string password = reader.GetString(reader.GetOrdinal("password"));
                            listaUtenti.Add(new Utente
                            {
                                ID = id,
                                Password = password
                            }
                            );
                        }
                    }
                }
                catch (SqliteException ex)
                {
                    Console.WriteLine($"Errore: {ex.Message}");
                }
            }
            SqliteConnection.ClearAllPools();
            return listaUtenti;
        }
    }
}
