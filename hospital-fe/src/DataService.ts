export class DataService {
  
    private static readonly BASE_URL: string = 'http://localhost:7200';
    
    static async fetchPatients(callback: (result: Record<string, number> | null) => void): Promise<void> {
      try {
        // Fetch patients
        const patientsResponse = await fetch(`${DataService.BASE_URL}/patients`);
  
        // Ensure both requests are successful
        if (!patientsResponse.ok) {
          throw new Error('Failed to fetch data');
        }
  
        // Extract data from responses
        const patientsData = await patientsResponse.text();
  
        // Process and count occurrences
        const countMap = DataService.countOccurrences(patientsData);
    
        // Invoke the callback with the result
        callback(countMap);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Invoke the callback with null in case of an error
        callback(null);
      }
    }

    static async fetchDrugs(callback: (result: string[] | undefined | null) => void): Promise<void> {
        try {
            // Fetch drugs data
            const drugsResponse = await fetch(`${DataService.BASE_URL}/drugs`);
      
            // Ensure both requests are successful
            if (!drugsResponse.ok) {
              throw new Error('Failed to fetch data');
            }
      
            // Extract data from responses
            const drugsData = await drugsResponse.text();
      
            // Process drugs string into an array
            const arrayOfDrugs = drugsData.split(',')?.map((drug) => drug.replace(/["\\]/g, ''));
      
            // Invoke the callback with the result
            callback(arrayOfDrugs);
          } catch (error) {
            console.error('Error fetching data:', error);
            // Invoke the callback with null in case of an error
            callback(null);
        }
    }
  
    private static countOccurrences(data: string): Record<string, number> {
      const letterCount: Record<string, number> = { F: 0, H: 0, D: 0, T: 0, X: 0 };
  
      // Count occurrences for each letter
      data.split(',').forEach((letter) => {
        if (letter in letterCount) {
          letterCount[letter]++;
        }
      })
  
      return letterCount;
    }
  }
  