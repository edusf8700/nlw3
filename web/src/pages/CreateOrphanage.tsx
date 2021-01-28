import React, { ChangeEvent, FormEvent, useState } from "react";
import { Marker, useMapEvents } from 'react-leaflet';
import { useHistory } from 'react-router-dom';

import PrimaryButton from "../components/PrimaryButton";
import Sidebar from "../components/Sidebar";

import '../styles/createOrphanage.css';
import { FiPlus } from "react-icons/fi";
import Map from "../components/Map";
import happyMapIcon from "../components/Map/mapIcon";
import api from "../services/api";


export default function OrphanagesMap() {
  const [position, setPosition ] = useState({ latitude: 0, longitude: 0 });
  const [name, setName ] = useState('');
  const [about, setAbout ] = useState('');
  const [instructions, setInstructions ] = useState('');
  const [opening_hours, setOpeningHours ] = useState('');
  const [open_on_weekends, setOpenOnWeekends ] = useState(true);
  const [images, setImages ] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview ] = useState<string[]>([]);

  const history = useHistory();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image)
    })

    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/app');
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) {
      return;
    }

    const selectImages = Array.from(event.target.files);

    setImages(selectImages);
    
    const selectImagesPreview = selectImages.map( image => {
      return URL.createObjectURL(image);
    });

    setImagesPreview(selectImagesPreview);

  }

  const Markers = () => {
    useMapEvents({
      click(e) {                                
        setPosition({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng
        });                
      },            
    });
    
    return (
      position.latitude !== 0 ? (
        <Marker
          interactive={false} 
          icon={happyMapIcon} 
          position={[position.latitude, position.longitude]} 
        />
      ): null
    )
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              style={{ width: '100%', height: 280 }}
            >
              <Markers />
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300}
                value={about} 
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {imagesPreview.map(image => {
                  return <img key={name} src={image} alt={name}/>
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              
              <input id="image[]" multiple type="file" onChange={handleSelectImages}></input>
              
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"
                value={instructions} 
                onChange={event => setInstructions(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
                id="opening_hours"
                value={opening_hours} 
                onChange={event => setOpeningHours(event.target.value)}
             />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button 
                  type="button"
                  className={open_on_weekends ? "" : "active"}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <PrimaryButton type="submit">Confirmar</PrimaryButton>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;