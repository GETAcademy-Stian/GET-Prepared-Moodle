using System;
using System.Windows;
using Microsoft.Win32;
using System.Windows.Controls;
using TagLib;

namespace WPF
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            mediaElement.Volume = volumeSlider.Value;
        }

        private void BtnPlay_Click(object sender, RoutedEventArgs e)
        {
            if (mediaLibraryListBox.SelectedItem != null)
            {
                string selectedFile = mediaLibraryListBox.SelectedItem.ToString();
                mediaElement.Source = new Uri(selectedFile);
                mediaElement.Play();
                UpdateMetadata(selectedFile);
            }
        }

        private void BtnPause_Click(object sender, RoutedEventArgs e)
        {
            mediaElement.Pause();
        }

        private void BtnStop_Click(object sender, RoutedEventArgs e)
        {
            mediaElement.Stop();
        }

        private void VolumeSlider_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            mediaElement.Volume = volumeSlider.Value;
        }

        private void BtnAddMedia_Click(object sender, RoutedEventArgs e)
        {
            OpenFileDialog openFileDialog = new()
            {
                Filter = "Media files (*.mp3;*.mp4;*.wav;*.wmv)|*.mp3;*.mp4;*.wav;*.wmv"
            };

            if (openFileDialog.ShowDialog() == true)
                foreach (string filename in openFileDialog.FileNames)
                    mediaLibraryListBox.Items.Add(filename);
        }

        private void BtnRemoveMedia_Click(object sender, RoutedEventArgs e)
        {
            if (mediaLibraryListBox.SelectedItem != null)
                mediaLibraryListBox.Items.Remove(mediaLibraryListBox.SelectedItem);
        }

        private void BtnAddPlaylist_Click(object sender, RoutedEventArgs e)
        {
            playlistsListBox.Items.Add("New Playlist");
        }

        private void BtnRemovePlaylist_Click(object sender, RoutedEventArgs e)
        {
            if (playlistsListBox.SelectedItem != null)
                playlistsListBox.Items.Remove(playlistsListBox.SelectedItem);
        }

        private void UpdateMetadata(string filepath)
        {
            File file = File.Create(filepath);
            metadataTitle.Text = "Title: " + file.Tag.Title;
            metadataArtist.Text = "Artist: " + file.Tag.FirstPerformer;
            var duration = file.Properties.Duration;
            metadataDuration.Text = $"Duration: {duration.Hours:D2}:{duration.Minutes:D2}:{duration.Seconds:D2}";
        }
    }
}